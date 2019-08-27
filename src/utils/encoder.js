import aes    from 'aes-cross';
import assert from 'http-assert';


const ENC_KEY = 'ca4d49b83c844c25'
const ENC_IV  = 'ef02636309d62455'

export const encode = (datagram, key, iv) => {

  if(!key)
    key = ENC_KEY
  if(!iv)
    iv = ENC_IV
  try {
  let enc = aes.encText(datagram, new Buffer.from(key), new Buffer.from(iv), 'utf-8','hex');
  //console.log("encrypted = " + enc)
  return enc;
  }
  catch(err){
    throw new Error('Encoder: Invalid Datagram ('+err.message+')');
  }
};

export const decode = (datagram, key, iv) => {

  if(!key)
    key = ENC_KEY
  if(!iv)
    iv = ENC_IV
  try {
    let dec = aes.decText(datagram, new Buffer.from(key), new Buffer.from(iv), 'utf-8','hex');
    //console.log("decrypted = " + dec)
    return dec;
  }
  catch(err){
    throw new Error('Decoder: Invalid Datagram [key: '+key+', iv: '+iv+'] ('+err.message+')');
  }

};