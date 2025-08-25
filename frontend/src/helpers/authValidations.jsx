import toast from "react-hot-toast";

export function registerValidations(formData){
    if (formData.name.trim().length < 3) {
      toast.error("please enter name");
      return false;
    }

    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }

    if (formData.password.trim().length < 8) {
      toast.error("password should be 8 characters long");
      return false;
    }

    return true;
  
};


export function loginValidations(formData){
    
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }

    if (formData.password.trim().length < 8) {
      toast.error("password should be 8 characters long");
      return false;
    }

    return true;
  
};

