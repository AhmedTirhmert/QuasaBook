// const AuthMid = ({ next, router }) => {
//   if (Auth.currentUser === null) {
//     return router.push("/");
//   }
//   return next();
// };
// const SignedInMid = ({ next, to }) => {
//   console.log(to.name);
// };
export default function AuthMid({ next, store }) {
  console.log(store);
  // console.log(Auth.currentUser);
  // console.log(next);
  // console.log(to);
  if (Auth.currentUser === null) {
    console.log(to, next);
    return router.push("/");
  }
  return next();
}
