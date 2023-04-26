// 'use client';
//WRAP THIS UP IN CLIENT COMPONENTS.
// import { Fragment, useEffect, useState } from "react";

// interface ClientOnlyCheckProps {
//     children: React.ReactNode
// }

// const ClientOnlyCheck: React.FC<ClientOnlyCheckProps> = ({
//     children
// }) => {

//     const [hasMounted, setIsMounted] = useState(false);

//     //when it loads, it finishes the server side redering
//     useEffect(() => {
//         setIsMounted(true);
//     }, []);

//     if(!hasMounted) {
//         return null;
//     }

//     return (
//         <Fragment>
//             {children}
//         </Fragment>
//     )
// }
// export default ClientOnlyCheck;