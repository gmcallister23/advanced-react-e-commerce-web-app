import { useDispatch } from "react-redux";
import type { CheckoutStep } from "../../types/types";
import { clearCart } from "../../cart/cartSlice";
import { createOrder } from "../../api/orderApi";

type Props = {
    step: CheckoutStep;
    setStep: React.Dispatch<React.SetStateAction<CheckoutStep>>;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    onConfirm: () => Promise<void>;
};

const CheckoutModal = ({ step, setStep, showModal, setShowModal, onConfirm }: Props) => {

    const dispatch = useDispatch();

    const handleConfirm = async () => {
    await onConfirm();
    
    dispatch(clearCart());
    setStep("success");
    }

    return (
        <>
        
        {showModal && (
            <div className="modal show d-block">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                            {step === "confirm" ? "Confirm Purchase" : "Success"}
                            </h5>
                        </div>
                <div className="modal-body">
                    {step === "confirm" ?(
                        <p>Are you sure you want to confirm your purchase?</p>
                    ) : (
                        <p>Your purchase is complete!</p>
                    )}
                </div>
                <div className="modal-footer">
                    {step === "confirm" ? (
                        <>
                            <button onClick={handleConfirm}>Confirm</button>
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                        </>                     
                    ) : (
                        <button onClick={() => setShowModal(false)}>Close</button>
                    )}
                </div>
            </div>
        </div>
    </div>

)}

        </>
    )
}


export default CheckoutModal;
