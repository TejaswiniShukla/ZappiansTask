import { apiInstance } from "./apiConfig";

export const loginService = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let loginData = await apiInstance.post("/login", data);
      resolve(loginData);
    } catch (error) {
      reject(error);
    }
  });
};

export const registerService = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let registerData = await apiInstance.post("/register", data);
      resolve(registerData);
    } catch (error) {
      reject(error);
    }
  });
};

export const showAllService = async (data) => {

  return new Promise(async (resolve, reject) => {
    try {
      let allUserData = await apiInstance.get("/user/show", data);
      resolve(allUserData);
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteUserService = async (data) => {
   
  return new Promise(async (resolve, reject) => {
    try {
      let deleteUserData = await apiInstance.post(`/user/delete/${data.id}`);
      resolve(deleteUserData);
    } catch (error) {
      reject(error);
    }
  });

};

export const updateUserService = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let updateUserData = await apiInstance.patch(`/user/edit`, data);
      resolve(updateUserData);
    } catch (error) {
      reject(error);
    }
  });
};


