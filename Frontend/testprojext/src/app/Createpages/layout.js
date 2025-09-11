import VedioProvider from "./pagecom/VedioProvider";

export default function layout({children}){
    return (
        <>
        <VedioProvider children={children}/>
        </>
    )
}