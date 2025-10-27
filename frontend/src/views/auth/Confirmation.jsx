import Header from "../admin/partial/Header";
import Footer from "../admin/partial/Footer";

export default function Confirmation(){
    return(
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-900 via-black to-gray-900">
            <Header />
            <div className="flex flex-1 items-center justify-center px-4 mt-40">
                <div className="max-w-md w-full bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
                    <h2 className="text-3xl font-bold text-center text-white mb-6">
                        Verification Email is Sent to Your Email
                    </h2>
                    <p className="bg-gradient-to-r from-gray-800 via-gray-100 to-gray-800 text-transparent text-center mb-8">
                        <span className="font-bold text-black px-5" style={{backgroundColor:"#ffffffff", borderRadius:"12px"}}>Verification Link is sent to your Account.</span>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    )
}