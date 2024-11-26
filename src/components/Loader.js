
import { RotatingLines } from "react-loader-spinner";

export default function Loader() {
    return (
        <div className="loader">
            <RotatingLines
            visible={true}
            height="50"
            width="50"
            color="grey"
            strokeColor="#3cbfd3"
            strokeWidth="4"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass="" />
        </div>
    )
}