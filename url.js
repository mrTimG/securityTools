const url = {
    encode:function(string){
        if(!string){
            console.log('error no string to encode')
        }
        else{
            const urlString = encodeURIComponent(string)
            console.log(urlString)
        }
    },
    decode:function(string){
        if(!string){
            console.log('error no string to decode')
        }
        else{
            try {
                const plainTextString = decodeURIComponent(string)
                console.log(plainTextString)
            } catch (e) {
                console.error('Malformed percent-encoding')
            }
        }
    }


}

module.exports = url;
