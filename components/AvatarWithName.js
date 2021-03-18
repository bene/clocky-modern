import React from "react";

const AvatarWithName = ({ employee }) => (
    <div className="w-32 text-center">
        <img
            src="/avatar.svg"
            className={`rounded-full border-4 border-solid ${
                employee.status !== "CheckedOut" ? " border-primary-600" : "border-transparent"
            }`}
            height="250"
            width="250"
            alt=""
        />

        <p className="text-xl mt-3">{employee.firstName}</p>
        <p className="text-xl">{employee.lastName}</p>
    </div>
);

export default AvatarWithName;
