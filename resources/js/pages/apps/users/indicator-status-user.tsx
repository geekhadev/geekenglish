export default function IndicatorUserStatus({ status }: { status: boolean }) {
    return (
        <div
            className={`absolute -right-1 -bottom-1 rounded-full p-1 py-0 text-[8pt] font-bold ${status ? 'bg-lime-400 text-lime-900' : 'bg-gray-200 text-black'}`}
        >
            {status ? 'Online' : ''}
        </div>
    );
}
