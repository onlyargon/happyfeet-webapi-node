const atob = require("atob");
const btoa = require("btoa");

const User = require("../models/userModel");
const Company = require("../models/companyModel");
const Profile = require("../models/profileModel");
const Address = require("../models/addressModel");

// User
module.exports.CreateUser = async (user) => {
  try {
    if (user.basicInfo.userType == "Customer") {
      var createdProfile = await Profile.create(user.basicInfo);
      var userAddress = await Address.create(user.address);
  
      var obj = {
        Code: 0,
        Message: "User profile updated!",
        Data: null,
      };
  
      return obj;
    } else {
      var createdProfile = await Company.create(user.basicInfo);
      var userAddress = await Address.create(user.address);
  
      var obj = {
        Code: 0,
        Message: "Company profile updated!",
        Data: null,
      };
  
      return obj;
    }
  } catch (error) {
    
    var obj = {
      Code: 1,
      Message: "Somthing went wrong!",
      Data: error,
    };

    return obj;

  }
};

module.exports.UpdateUser = async (user) => {
  var usr = await User.findOne({
    where: {
      id: user.basicInfo.userId,
    },
  });

  if (usr.userType == "Customer") {
    var updatedProfile = await Profile.update(user.basicInfo, {
      where: {
        userId: user.basicInfo.userId,
      },
    });
  } else {
    var updatedProfile = await Company.update(user.basicInfo, {
      where: {
        userId: user.basicInfo.userId,
      },
    });
  }

  var updateAddress = await Address.update(user.address, {
    where: {
      userId: user.address.userId,
    },
  });

  if (updatedProfile && updateAddress) {
    var obj = {
      Code: 0,
      Message: "User updated!",
      Data: null,
    };

    return obj;
  } else {
    var obj = {
      Code: 1,
      Message: "Something went wrong!",
      Data: null,
    };

    return obj;
  }
};

module.exports.DeleteUser = async (user) => {
  user.basicInfo.isDelete = true;
  user.basicInfo.isActive = false;

  user.profile.isDelete = true;
  user.profile.isActive = false;

  user.address.isDelete = true;
  user.address.isActive = false;

  var _ = await User.update(user.basicInfo, {
    where: {
      userId: user.basicInfo.userId,
    },
  });

  var _ = await Profile.update(user.profile, {
    where: {
      userId: user.profile.userId,
    },
  });

  var _ = await Address.update(user.address, {
    where: {
      userId: user.address.userId,
    },
  });

  var obj = {
    Code: 0,
    Message: "User has deleted!",
    Data: null,
  };

  return obj;
};

module.exports.GetUserProfile = async (obj) => {
  console.log(obj);
  var profile = await User.findOne({
    where: {
      id: obj.userId,
    },
  });

  if (profile) {
    if (profile.userType == "Customer") {
      var uProf = await Profile.findOne({
        where: {
          userId: profile.id,
        },
      });

      var address = await Address.findOne({
        where: {
          userId: profile.id,
        },
      });

      if (uProf) {
        var obj = {
          Code: 0,
          Message: "Success",
          Data: {
            basicInfo: uProf,
            address: address,
          },
        };

        return obj;
      } else {
        var obj = {
          Code: 1,
          Message: "Something went wrong!",
          Data: null,
        };

        return obj;
      }
    } else {
      var uProf = await Company.findOne({
        where: {
          userId: profile.id,
        },
      });

      var address = await Address.findOne({
        where: {
          userId: profile.id,
        },
      });

      if (uProf) {
        var obj = {
          Code: 0,
          Message: "Success",
          Data: {
            basicInfo: uProf,
            address: address,
          },
        };

        return obj;
      } else {
        var obj = {
          Code: 1,
          Message: "Something went wrong!",
          Data: null,
        };

        return obj;
      }
    }
  }
};

module.exports.ValidateUser = async (user) => {
  let username = atob(user.networkStatus1);
  let password = atob(user.networkStatus2);

  var user = await User.findOne({
    where: {
      username: user.networkStatus1,
      password: user.networkStatus2,
      isActive: true,
      isDeleted: false,
    },
  });

  if (user) {
    if (user.userType == "Customer") {
      var profile = await Profile.findOne({
        where: {
          userId: user.id,
          isActive: true,
          isDeleted: false,
        },
      });

      if (profile) {
        var obj = {
          Code: 0,
          Message: "Success",
          Data: profile,
        };

        return obj;
      } else {
        var obj = {
          Code: 1,
          Message: "User not found!",
          Data: null,
        };

        return obj;
      }
    }

    if (user.userType == "Company") {
      var profile = await Company.findOne({
        where: {
          userId: user.id,
          isActive: true,
          isDeleted: false,
        },
      });

      if (profile) {
        var obj = {
          Code: 0,
          Message: "Success",
          Data: profile,
        };

        return obj;
      } else {
        var obj = {
          Code: 1,
          Message: "User not found!",
          Data: null,
        };

        return obj;
      }
    }
  }

  var obj = {
    Code: 1,
    Message: "Failed",
    Data: null,
  };

  return obj;
};

module.exports.GetALlCompanies = async () => {
  var companies = await Company.findAll({
    where: {
      isActive : true,
      isDeleted :false
    },
  });
  
  var responseList = [];
  for(let com of companies){
  var address = await Address.findOne({where:{
    userId : com.userId
  }});

  responseList.push({
    company : com,
    address :address
  })
}


  if (companies) {
    var obj = {
      Code: 0,
      Message: "Success",
      Data: responseList,
    };

    return obj;
  } else {
    var obj = {
      Code: 1,
      Message: "Something went wrong!",
      Data: null,
    };

    return obj;
  }
};
