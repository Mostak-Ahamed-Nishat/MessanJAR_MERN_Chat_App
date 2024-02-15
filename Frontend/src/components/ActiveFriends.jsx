import React from "react";

export default function ActiveFriends({ user }) {
  return (
    <div className="active-friend">
      <div className="image-active-icon">
        {/* <img src={`./../../public/usersImg/${user.userInfo.image}`} alt="" /> */}

        {/* {user.map((au) => console.log(au))} */}
        {/* {console.log(user)} */}

        {}

        {user && user.length > 0
          ? user.map((u) => {
              if (u.userId) {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <div className="image">
                    <img
                      src={`../../public/usersImg/${u.userInfo.image}`}
                      alt=""
                    />
                    <div className="active-icon"></div>
                  </div>
                );
              }
            })
          : ""}

        <div className="image">
          <img
            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
            alt=""
          />
          <div className="active-icon"></div>
        </div>
      </div>
    </div>
  );
}

// import React from "react";

// export default function ActiveFriends({ user }) {

//   console.log("Active ");
//   console.log(user);
// {/* <div className="image">
//           <img src={`./../../public/usersImg/${user.userInfo.image}`} alt="" />
//           <div className="active-icon"></div>
//         </div> */}

//   return (
//     <div className="active-friend">
//       <div className="image-active-icon">
//         {/* <img src={`./../../public/usersImg/${user.userInfo.image}`} alt="" /> */}

//         <div className="image">
//           <img
//             src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
//             alt=""
//           />
//           <div className="active-icon"></div>
//         </div>

//         <div className="image">
//           <img
//             src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
//             alt=""
//           />
//           <div className="active-icon"></div>
//         </div>

//         <div className="image">
//           <img
//             src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
//             alt=""
//           />
//           <div className="active-icon"></div>
//         </div>

//         <div className="image">
//           <img
//             src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
//             alt=""
//           />
//           <div className="active-icon"></div>
//         </div>

//         <div className="image">
//           <img
//             src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
//             alt=""
//           />
//           <div className="active-icon"></div>
//         </div>
//         <div className="image">
//           <img
//             src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
//             alt=""
//           />
//           <div className="active-icon"></div>
//         </div>
//         <div className="image">
//           <img
//             src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
//             alt=""
//           />
//           <div className="active-icon"></div>
//         </div>
//         <div className="image">
//           <img
//             src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
//             alt=""
//           />
//           <div className="active-icon"></div>
//         </div>
//         <div className="image">
//           <img
//             src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
//             alt=""
//           />
//           <div className="active-icon"></div>
//         </div>
//         <div className="image">
//           <img
//             src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
//             alt=""
//           />
//           <div className="active-icon"></div>
//         </div>
//         <div className="image">
//           <img
//             src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
//             alt=""
//           />
//           <div className="active-icon"></div>
//         </div>
//         <div className="image">
//           <img
//             src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
//             alt=""
//           />
//           <div className="active-icon"></div>
//         </div>
//       </div>
//     </div>
//   );
// }
