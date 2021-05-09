var isRunning = false;
var init = require('./Core/init.js')
process.setMaxListeners(0);
require('events').EventEmitter.defaultMaxListeners = Infinity;
var iTime = 0;
const sql = require('mssql')
var countDoc = 0;
var fs = require('fs');
var util = require('util');
var dir = __dirname +'/log';

//var EventLogger = require('node-windows').EventLogger;

//var log = new EventLogger('ApdataSAP');

//log.info('Basic information.');
//log.warn('Watch out!');
//log.error('Something went wrong.');

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

var log_file = fs.createWriteStream(__dirname + '/log/'+getDateTime()+'.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
  //log.info(util.format(d));
};

function execSQLQuery(sqlQry, callback){
    sql.close();
    sql.connect(init.NodeJs.config, function (err) {
    	if (err) 
    		console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query(sqlQry, function (err, recordset) {
            
            if (err) 
            	console.log(err)

            // send records as a response
            callback(recordset);
            
        });
    });
}

function JobStart() 
{
	
	if(countDoc === 0)
  	{
		try
		{
			countDoc = 1;
		  	//console.log("DO");
			var rfc = require('./Core/rfc.js')
			execSQLQuery("Select top 1 * From W_SAP_LogEventos", function(result){
				var list = [];
			    
				var users = result.recordsets[0];
			    var status = "";
			    countDoc = users.length;
			    
	 			if(users.length === 0)
	 				isRunning = false;
	 			//else
	 			//	console.log(new Date() + " - "  + JSON.stringify(result));
	 			
	 			for(i=0;i<users.length;i++)
			    {
			        var isAD = users[i].Evento === "AD" ? true : false;
			        var isDE = users[i].Evento === "DE" ? true : false;
					var code = users[i].Code;
					var coes = users[i]["P0032-EMFTX"];
					var user = users[i]["P0105-USRID"];
					
					rfc.SendDataToSAP(users[i], function(res)
					{
						var hasError = false;
						if(!res.Error)
						{
							var ret = res.RETURN;
							if(ret)
							{
								for(x=0;x<ret.length;x++)
								{
									if(ret[x].MSGTY === "E")
									{
										hasError = true;
										status = ret[x].MSGV1;
									}
								}
							}
							if(isAD)
							{
								
				    			if(hasError)
				    			{
									console.log(new Date() + " - "  + status);
									execSQLQuery("update SAP_LogsTransacoes set STATUS_PROCESS = '"+status+"' where LTR_CdiLogTransacao = '"+ code +"'", function(res){
										isRunning = false;
										countDoc--;
									});

				    			}
								else
								{
									execSQLQuery("update CONtratadosExtras set Coe_CosGlobal = '" + ret[0].PERNR + "' WHERE COE_CdiContratado = '"+ coes +"'", function(res){
										//console.log(new Date() + " - "  + JSON.stringify(res));
										execSQLQuery("update SAP_LogsTransacoes set STATUS_PROCESS = 'Sucesso' where LTR_CdiLogTransacao = '"+ code +"'", function(res){
											execSQLQuery("update ContratadosFlexiveis set COF_DssConteudoFlexivel_01 = '"+user+"' where COF_CdiContratado = '"+ coes +"'", function(res){
												//console.log(new Date() + " - "  + JSON.stringify(res));
												isRunning = false;
												countDoc--;
											});
										});
									});
								}
							}
							else
							{
								
								if(hasError)
								{
									console.log(new Date() + " - "  + JSON.stringify(res.RETURN));
									isRunning = false;
									//countDoc--;
								}
								else
								{
									console.log(new Date() + " - "  + JSON.stringify(res.RETURN));
									status = "Sucesso";
									isRunning = false;
									//countDoc--;
								}
								if(!isDE)
								{
									execSQLQuery("update SAP_LogsTransacoes set STATUS_PROCESS = '"+ status +"' where LTR_CdiLogTransacao = '"+ code +"'", function(res){
										//console.log(new Date() + " - "  + JSON.stringify(res));
										isRunning = false;
										countDoc--;
										//console.log(countDoc);
									});
								}
								else
								{
									execSQLQuery("update SAP_LogsTransacoesRegistros set STATUS_PROCESS = '"+ status +"' where LTE_CDICONTEUDO_BASE = '"+ code +"'", function(res){
										//console.log(new Date() + " - "  + JSON.stringify(res));
										isRunning = false;
										countDoc--;
										//console.log(countDoc);
									});	
								}
							}
						}
					});
					//isRunning = false;
			    }

			});
		}
		catch(e)
		{
			console.log(new Date() + " - "  + JSON.stringify(e));
			isRunning = false;
			countDoc = 0;
		}
	}
};

function run() {
  setInterval(JobStart, 3000);
};

run();
console.log("Running since:" + new Date());

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + "" + month + "" + day + "" + hour + "" + min + "" + sec;

}