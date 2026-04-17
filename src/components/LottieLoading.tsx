import nailAnimation from "../assets/Manicure treatment.lottie?url"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"

function LottieLoading() {
    return(
        <>
         <DotLottieReact src={nailAnimation} autoplay loop />
        </>
    )
}

export default LottieLoading