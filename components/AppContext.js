import React from "react";

const AppContext = React.createContext({
    isConnected: false,
    companyName: "",
    employees: [],
});

export default AppContext;
