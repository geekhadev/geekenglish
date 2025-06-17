export default function IndicatorUserStatus({ status }: { status: boolean }) {
    return (
        <div className={`text-[8pt] absolute font-bold -bottom-1 -right-1 p-1 py-0 rounded-full ${status ? 'bg-lime-400 text-lime-900' : 'bg-gray-200 text-black'}`}>
            {status ? "Online" : ""}
        </div>
    )
}
