/**
 * Payload Decoder for The Reports
 * 
 * Copyright 2022 HKT  Smart Circuit Breaker
 * 
 * @product  SCB-100
 */
 function Decoded(Bytes) 
 {
     var decoded = {};
     if(Bytes[0]===0xAA)
       {
           if(Bytes[1]===0x07||Bytes[1]===0x08)//主动或者被动上报数据
           {
            if(Bytes.length===68)
              decoded.CMD=readUInt8LE(Bytes.slice(1,2));
              decoded.addr=readUInt8LE(Bytes.slice(2,3));
              decoded.Ratedcurrent=readUInt8LE(Bytes.slice(3,4));
              decoded.types=readUInt8LE(Bytes.slice(4,5));
              decoded.payload=readUInt8LE(Bytes.slice(5,6));
              decoded.Totalvoltage=readUInt16LE(Bytes.slice(6,8));
              decoded.Leakagecurrent=readUInt16LE(Bytes.slice(8,10));
              decoded.power=readUInt16LE(Bytes.slice(10,12));
              decoded.temperature=readUInt16LE(Bytes.slice(12,14))/10;
              decoded.current=readUInt16LE(Bytes.slice(14,16));
              decoded.warning=readUInt16LE(Bytes.slice(16,18)).toString(2);
              decoded.Q=readUInt32LE_SWP32(Bytes.slice(18,22));
              decoded.Phasevoltage_A=readUInt16LE(Bytes.slice(22,24));
              decoded.Phasevoltage_B=readUInt16LE(Bytes.slice(24,26));
              decoded.Phasevoltage_C=readUInt16LE(Bytes.slice(26,28));
              decoded.Phasecurrent_A=readUInt16LE(Bytes.slice(28,30));
              decoded.Phasecurrent_B=readUInt16LE(Bytes.slice(30,32));
              decoded.Phasecurrent_C=readUInt16LE(Bytes.slice(32,34));
              decoded.Phasecurrent_N=readUInt16LE(Bytes.slice(34,36));
              decoded.Phasepower_A=readUInt16LE(Bytes.slice(36,38));
              decoded.Phasepower_B=readUInt16LE(Bytes.slice(38,40));
              decoded.Phasepower_C=readUInt16LE(Bytes.slice(40,42));
              decoded.Phase_A_Warning=readUInt16LE(Bytes.slice(42,44));
              decoded.Phase_B_Warning=readUInt16LE(Bytes.slice(44,46));
              decoded.Phase_C_Warning=readUInt16LE(Bytes.slice(46,48));
              decoded.closing=readUInt16LE(Bytes.slice(48,50)).toString(16);
              decoded.Phasepower_factor_A=readUInt16LE(Bytes.slice(50,52));
              decoded.Phasepower_factor_B=readUInt16LE(Bytes.slice(52,54));
              decoded.Phasepower_factor_C=readUInt16LE(Bytes.slice(54,56));
              decoded.temperature_A=readUInt16LE(Bytes.slice(56,5));
              decoded.temperature_B=readUInt16LE(Bytes.slice(58,60));
              decoded.temperature_C=readUInt16LE(Bytes.slice(60,62));
              decoded.temperature_N=readUInt16LE(Bytes.slice(62,64));
              decoded.Remotecontrol=readUInt8LE(Bytes.slice(64,65));
           }
           else if(Bytes[1]===0x05&&Bytes.length===49)//断路器的门限值参数
           {
            decoded.CMD=readUInt8LE(Bytes.slice(1,2));
            decoded.addr=readUInt8LE(Bytes.slice(2,3));
            decoded.Types_Loadcurrent=readUInt8LE(Bytes.slice(3,4));
            decoded.Types=readUInt8LE(Bytes.slice(4,5));

            decoded.Datalength=readUInt8LE(Bytes.slice(5,6));
            decoded.voltagelimit_UP=readUInt16LE(Bytes.slice(6,8));
            decoded.voltagelimit_Down=readUInt16LE(Bytes.slice(8,10));
            decoded.Ratedcurrent_limit_UP=readUInt16LE(Bytes.slice(10,12));
            decoded.powerlimit_UP=readUInt16LE(Bytes.slice(12,14));
            decoded.temperaturelimit=readUInt16LE(Bytes.slice(14,16));
            decoded.currentlimit=readUInt16LE(Bytes.slice(16,18));
            decoded.Phasecurrent_A_UPLimit=readUInt16LE(Bytes.slice(18,20));
            decoded.Phasecurrent_B_UPLimit=readUInt16LE(Bytes.slice(20,22));
            decoded.Phasecurrent_C_UPLimit=readUInt16LE(Bytes.slice(22,24));
            decoded.Phasepower_A_UPLimit=readUInt16LE(Bytes.slice(24,26));
            decoded.Phasepower_B_UPLimit=readUInt16LE(Bytes.slice(26,28));
            decoded.Phasepower_C_UPLimit=readUInt16LE(Bytes.slice(28,30));
            decoded.V_Warn_UPLimit=readUInt16LE(Bytes.slice(30,32));
            decoded.V_Warn_DownLimit=readUInt16LE(Bytes.slice(32,34));
            decoded.Ratedcurrent_Warn_UPLimit=readUInt16LE(Bytes.slice(34,36));
            decoded.temperature_Warn_UPLimit=readUInt16LE(Bytes.slice(36,38));
            decoded.current_A_Warning=readUInt16LE(Bytes.slice(38,40));
            decoded.current_B_Warning=readUInt16LE(Bytes.slice(40,42));
            decoded.current_C_Warning=readUInt16LE(Bytes.slice(42,44));
            decoded.current_warning=readUInt16LE(Bytes.slice(44,46));
           }
           else if(Bytes.length===7)//应答帧
           {
            decoded.CMD=readUInt8LE(Bytes.slice(1,2));
            decoded.addr=readUInt8LE(Bytes.slice(2,3));
            decoded.Datalength=readUInt8LE(Bytes.slice(3,4));
           }
        //    else if(Bytes[1]===0x00&&Bytes.length===8)//设置断路器地址
        //    {
        //     decoded.CMD=readUInt8LE(Bytes.slice(1,2));
        //     decoded.addr=readUInt8LE(Bytes.slice(2,3));
        //     decoded.Datalength=readUInt8LE(Bytes.slice(3,4));
        //     decoded.Settting_Mode=readUInt8LE(Bytes.slice(4,5));
        //    }
        //    else if(Bytes[1]===0x01&&Bytes.length===9)//设置上报实时数据间隔时间
        //    {
        //     decoded.CMD=readUInt8LE(Bytes.slice(1,2));
        //     //decoded.addr=readUInt8LE(Bytes.slice(2,3));
        //     decoded.Datalength=readUInt8LE(Bytes.slice(3,4));
        //     decoded.Time=readUInt16LE(Bytes.slice(4,6));

        //    }
        //    else if(Bytes[1]===0x03&&Bytes.length===8)//控制指定断路器的开和关
        //    {
        //     decoded.CMD=readUInt8LE(Bytes.slice(1,2));
        //     decoded.addr=readUInt8LE(Bytes.slice(2,3));
        //     decoded.Datalength=readUInt8LE(Bytes.slice(3,4));
        //     decoded.closing_status=readUInt8LE(Bytes.slice(4,5));
        //    }
        //    else if(Bytes[1]===0x04&&Bytes.length===7)//恢复出厂设置
        //    {
        //     decoded.CMD=readUInt8LE(Bytes.slice(1,2));
        //     //decoded.addr=readUInt8LE(Bytes.slice(2,3));
        //     decoded.Datalength=readUInt8LE(Bytes.slice(3,4));
        //    }
        //    else if(Bytes[1]===0x05&&Bytes.length===7)//读取指定断路器的门限值参数
        //    {
        //     decoded.CMD=readUInt8LE(Bytes.slice(1,2));
        //     decoded.addr=readUInt8LE(Bytes.slice(2,3));
        //     decoded.Datalength=readUInt8LE(Bytes.slice(3,4));
        //    }
        //    else if(Bytes[1]===0x06&&Bytes.length===7)//读取指定断路器的实时数据
        //    {
        //     decoded.CMD=readUInt8LE(Bytes.slice(1,2));
        //     decoded.addr=readUInt8LE(Bytes.slice(2,3));
        //     decoded.Datalength=readUInt8LE(Bytes.slice(3,4));
        //    }
        //    else if(Bytes[1]===0x09&&Bytes.length===9)//控制多个断路器
        //    {
        //     decoded.CMD=readUInt8LE(Bytes.slice(1,2));
        //     //decoded.addr=readUInt8LE(Bytes.slice(2,3));
        //     decoded.Datalength=readUInt8LE(Bytes.slice(3,4));
        //     decoded.Closing=readUInt16LE(Bytes.slice(4,6)).toString(2);
        //    }
          
       }
 
         return decoded;
     
 }
 
 /* ******************************************
  * bytes to number
  ********************************************/
 function readUInt8LE(byte) 
 {
 return (byte & 0xFF);
 }
 
 function readUInt8LE_SWP8(byte) 
 {
  return (value & 0xFF);
 }
 
 function readInt8LE(byte) 
 {
 var ref = readUInt8LE(byte);
  return (ref > 0x7F) ? ref - 0x100 : ref;
 }
 
 function readUInt16LE(byte) 
 {
  var value = (byte[0] << 8) + byte[1];
  return (value & 0xFFFF);
 }
 
 function readUInt16LE_SWP16(byte) 
 {
  var value = (byte[1] << 8) + byte[0];
  return (value & 0xFFFF);
 }
 
 function readInt16LE(byte)
 {
  var ref = readUInt16LE(byte);
 return (ref > 0x7FFF) ? ref - 0x10000 : ref;
 }
 
 function readUInt32LE(byte) 
 {
  var value = (byte[0] << 24) + (byte[1] << 16) + (byte[2] << 8) + byte[3];
  return (value & 0xFFFFFFFF);
 }
 
 function readUInt32LE_SWP32(byte) 
 {
 var value = (byte[3] << 24) + (byte[2] << 16) + (byte[1] << 8) + byte[0];
 return (value & 0xFFFFFFFF);
 }
 
 function readInt32LE(byte) 
 {
  var ref = readUInt32LE(byte);
 return (ref > 0x7FFFFFFF) ? ref - 0x100000000 : ref;
 }
 
 function readInt32LE_SWP32(byte) 
 {
  var ref = readUInt32LE_SWP32(byte);
 return (ref > 0x7FFFFFFF) ? ref - 0x100000000 : ref;
 }
 
 function readDoubleLE(byte)
 {
     var n;
     var Exponent;
     if(byte[7]&0xF0)//求阶码与阶数
     {
       byte[7]=byte[7]&0x7F;
        Exponent=(byte[7]<<4)+((byte[6]&0xF0)>>4);
        n=Exponent-1023;
     }
     else
     {
         Exponent=(byte[7]<<4)+((byte[6]&0xF0)>>4);
         n=Exponent-1023;
     }
    var integer=((byte[6]&0x0F)<<24)+(byte[5]<<16)+(byte[4]<<8)+byte[3];
    var Integer=(integer>>(28-n))+(0x01<<n);
    var decimal=(integer-((integer>>(28-n))<<(28-n)))/Math.pow(2,28-n);
    return Integer+decimal;

 }
 
 

 
 function readX16LE(byte)
 {
     var value = (byte[0] << 8) + byte[1];
     return (value & 0xFFFF);
 }
 
 function readX16LE_SWP32(byte)
 {
     var value = (byte[1] << 8) + byte[0];
     return (value & 0xFFFF);
 }
 
 function readS16LE(byte)
 {
     var value = (byte[0] << 8) + byte[1];
     return (value & 0xFFFF);
 }
 
 function readS16LE_SWP32(byte)
 {
     var value = (byte[1] << 8) + byte[0];
     return (value & 0xFFFF);
 }
 
 function dateFormat (timestamp) {
    var date = new Date(timestamp*1000);
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = (date.getHours()+8 >= 24 ?date.getDate()+1:date.getDate()) + ' ';
    h = (date.getHours()+8 >= 24 ? '0'+(date.getHours()-16):date.getHours()+8)+ ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds(); 
    
    console.log(Y+M+D+h+m+s);
     }
   
   
  
   
