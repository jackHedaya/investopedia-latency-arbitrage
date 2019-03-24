require("datejs");

module.exports = () => Date.today().set({ minute: new Date().getMinutes(), hour: new Date().getHours() }).addMinutes(-5).toString('yyyy-MM-dd HH:mm:ss')