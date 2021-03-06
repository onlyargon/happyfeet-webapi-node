const Order = require("../models/orderModel");
const Design = require("../models/designModel");

const designService = require("./designService");

module.exports.CreateOrder = async (obj) => {
  try {
    var count = await Order.count();
    obj.orderNumber = "ORDER00" + (count + 1);
    var order = await Order.create(obj);

    if (order) {
      var design = await Design.update(
        { isOrderPlaced: true },
        {
          where: {
            id: obj.designId,
          },
        }
      );

      var obj = {
        Code: 0,
        Message: "Success!",
        Data: order,
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
  } catch (error) {
    var obj = {
      Code: 1,
      Message: "Something went wrong!",
      Data: error,
    };

    return obj;
  }
};

module.exports.UpdateOrder = async (obj) => {
  var order = await Order.update(obj, {
    where: {
      orderNumber: obj.orderNumber,
    },
  });

  if (order) {
    var obj = {
      Code: 0,
      Message: "Success!",
      Data: order,
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

module.exports.CancelOrder = async (obj) => {
  obj.isActive = false;
  var order = await Order.update(obj, {
    where: {
      orderNumber: obj.orderNumber,
    },
  });

  if (order) {
    var obj = {
      Code: 0,
      Message: "Success!",
      Data: order,
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

module.exports.DeleteOrder = async (obj) => {
  obj.isActive = false;
  obj.isDeleted = true;

  var order = await Order.update(obj, {
    where: {
      orderNumber: obj.orderNumber,
    },
  });

  if (order) {
    var obj = {
      Code: 0,
      Message: "Success!",
      Data: order,
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

module.exports.GetAllActiveOrders = async (obj) => {
  var order = await Order.findAll({
    where: {
      isActive: true,
      isDeleted: false,
      isOrderAccepted: false,
    },
  });

  if (order) {
    var obj = {
      Code: 0,
      Message: "Success!",
      Data: order,
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

module.exports.GetAllOrders = async (obj) => {
  var order = await Order.findAll({
    where: {
      isDeleted: false,
    },
  });

  if (order) {
    var obj = {
      Code: 0,
      Message: "Success!",
      Data: order,
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

module.exports.GetOrderByUserId = async (obj) => {
  var order = await Order.findAll({
    where: {
      userId: obj.userId,
      isActive: true,
      isDeleted: false,
    },
  });

  if (order) {
    var obj = {
      Code: 0,
      Message: "Success!",
      Data: order,
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

module.exports.GetOrderByCompanyId = async (obj) => {
  var order = await Order.findAll({
    where: {
      comId: obj.userId,
      isActive: true,
      isDeleted: false,
    },
  });

  if (order) {
    var obj = {
      Code: 0,
      Message: "Success!",
      Data: order,
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
