import React, { useState, useEffect } from 'react';



export default function Pill({ intolerancia }) {
    return (
        <div className=" bg-red-300 flex flex-row justify-center align-middle items-center relative h-8 w-fit rounded-[1.25rem] my-4 px-4">
            <h1 className="  text-[1rem]">{intolerancia}</h1>
        </div>
    )
}