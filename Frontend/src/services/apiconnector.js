import axios from "axios";

export const axiosInstance= axios.create({});

// export const apiConnector= (method, url, bodyData, headres, params)=>{

//     return({
//         method:`${method}`,
//         url:`${url}`,
//         bodyData:bodyData ? bodyData: null,
//         headres:Headers ? headres: null,
//         params:params ? params : null

//     });

// }
//export const axiosInstance = axios.create({});

export const apiConnector = (
  method,
  url,
  bodyData = null,
  headers = null,
  params = null
) => {
  return axiosInstance({
    method,
    url,
    data: bodyData,
    headers: headers || {},
    params: params || {},
  });
};