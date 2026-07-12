interface iModalProps {
    active: boolean;
    setActive: (active: boolean) => void;
    onConfirm: () => void; 
}

export const ModalDeleteAll = ({ active, setActive, onConfirm }: iModalProps) => {

    if (!active) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
            onClick={() => setActive(false)}
        >
            <div 
                className="bg-gray-800 p-6 rounded-xl w-96 max-w-[90%] shadow-2xl border border-gray-700"
                onClick={e => e.stopPropagation()}
            >
                <h2 className="text-xl text-white font-bold mb-4">Подтверждение</h2>
                
                <p className="text-gray-300 mb-6">
                    Вы уверены, что хотите удалить все сообщения? Это действие нельзя отменить.
                </p>

                <div className="flex gap-3 justify-end">
                    <button
                        onClick={() => setActive(false)}
                        className="px-6 py-2 text-sm font-medium text-white bg-gray-700 rounded-lg 
                            hover:bg-gray-600 transition-all duration-300"
                    >
                        Отмена
                    </button>

                    <button
                        onClick={() => {
                            onConfirm(); 
                            setActive(false);
                        }}
                        className="px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-lg 
                            hover:bg-red-700 transition-all duration-300 
                            hover:shadow-lg hover:shadow-red-500/25"
                    >
                        Удалить всё
                    </button>
                </div>
            </div>
        </div>
    );
};