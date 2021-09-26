import React from 'react';


export const SideBar = (props) => {
  return (
    <div className="sidebar">
      <ul>
        <h4>Channels</h4>
        {props.children}
      </ul>
    </div>
  );
}

export const Canvas = (props) => {
  return (
    <div className="main">
      <div className="main_content">
        <section className="content">
          <h2>Image</h2>
          {props.children}
        </section>
      </div>
    </div>
  )
}
