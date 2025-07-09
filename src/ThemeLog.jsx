// ThemeLog.js
import React, { useState } from 'react';

function ThemeLog() {
    const [color, Setcolor] = useState(false);

    return (
        <>
            <div style={{ backgroundColor: color, color: color === "black" ? "white" : "black", height: "100px" }}>
                <p>This is the ThemeLog component.</p>

                <button onClick={() => Setcolor(color === "black" ? "white" : "black")}>Change Theme</button>
            </div>
        </>
    );
}

export default ThemeLog;
