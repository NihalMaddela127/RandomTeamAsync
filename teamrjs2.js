let fs=require('fs');
let prompt = require('prompt');
prompt.start();
  prompt.get(['FileName', 'TeamSize'], function (err, result) {
    if (err) { return onErr(err); }
        fs.readFile(result.FileName, "utf8", function(err, contents) {
            if(err) return console.log(err);        
        let jsonContent = JSON.parse(contents);
        console.log('User Input Received');
        aspirantsCount = jsonContent.aspirants.length;
        console.log(aspirantsCount);
        teamSize = result.TeamSize;
        if ( teamSize == parseInt(teamSize,10) && teamSize > 0 && teamSize < aspirantsCount){
            let mod = aspirantsCount % teamSize;
            let team = 1;
            let temp = teamSize;
            let count = 0;
            let remList = jsonContent.aspirants;        
            if (mod != 0){
                console.log("Cannot divide equally!!! \nDo you want to continue???\ny/n");
                    prompt.get('input', function (err, result) {
                    if (err) { return onErr(err);}
                    if (result.input.toLowerCase() == "y"){
                        while(count < aspirantsCount){
                            if (temp == teamSize){
                                let i = Math.floor(Math.random() * remList.length);
                                let person = remList[i];
                                fs.appendFile("teams.txt",`\nTeam ${team}`,function (err){
                                    if (err) throw err;
                                });
                                if( mod != 0 ){
                                fs.appendFile("teams.txt",Object.keys(person).join(" "),function (err){
                                    if (err) throw err;
                                });
                                remList.splice(i, 1);
                                mod -= 1;
                                count += 1;
                                }
                                temp = 0;
                                team += 1;
                            }
                            let i = Math.floor(Math.random() * remList.length);
                            let person = remList[i];
                            fs.appendFile("teams.txt",Object.keys(person).join(" "),function (err){
                                if (err) throw err;
                            });
                            remList.splice(i, 1);                        
                            temp += 1;
                            count += 1;
                        }
                    }
                    else{
                        console.log("Thank you!!!")
                    }
                });
            }
            else{
                fs.writeFile('result.txt',"Teams :\n",function (err){
                    if (err) throw err;
                });
                while(count < aspirantsCount){
                    let i = Math.floor(Math.random() * remList.length);
                    let person = remList[i];
                    if (temp == teamSize){
                        fs.appendFile("result.txt",'\nTeam'+team,function (err){
                            if (err) throw err;
                        });
                        temp = 0;
                        team += 1;
                    }
                    fs.appendFile("result.txt",Object.keys(person).join(" "),function (err){
                        if (err) throw err;
                    });
                    temp += 1;
                    count += 1;
                    remList.splice(i, 1);
                }
            }
        }
        else{
            console.log(`Enter integers between 1 and ${aspirantsCount}`);
        }
    });
});