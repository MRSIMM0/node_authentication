
import bcrypt from 'bcrypt'; 


export async function encode(password: string){
    return await bcrypt.hash(password, 10).then(hash=>hash);     
}

export async function compare(password:string,hash:string){
   return  await  bcrypt
   .compare(password, hash)
   .then(res => {
     return res
   })
   .catch(err => err)        
}
