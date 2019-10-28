
var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    accessKeyId: "accessKeyId",
    secretAccessKey: "secretAccessKey",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

module.exports.getUser = (userID) => {
    return new Promise( async (resolve, reject) => {
        var paramsUserInfo = {
            TableName : "Users",
            KeyConditionExpression: "UserID = :id AND Varies = :varies",
            ExpressionAttributeValues: {
                ":id": userID,
                ":varies" : userID
            }
        }
        docClient.query(paramsUserInfo, function(err, data) {
            if (err) {
                return reject(err);
            } else {
                return resolve(data.Items[0]);
            }
        });
    })
}


module.exports.getOrderTotalPrice = (orderID) => {
    return new Promise( async (resolve, reject) => {
        var paramsOrderDetail = {
            TableName : "Orders",
            KeyConditionExpression: "OrderID = :orderID",
            ExpressionAttributeValues: {
                ":orderID": orderID
            }
        };
        docClient.query(paramsOrderDetail, function(err, data) {
            if (err) {
                return reject(err);
            } else {
                var total = 0;
                data.Items.forEach(element => {
                    total+=element.Price;
                });
                return resolve(total);
            }
        });
    })
}

