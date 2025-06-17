import { cn } from '@/lib/utils';
import AppLogoIcon from './app-logo-icon';

export default function AppLogo({ classNameIcon, classNameText }: { classNameIcon?: string; classNameText?: string }) {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-lime-500 text-white">
                <AppLogoIcon className={cn('size-6', classNameIcon)} />
            </div>
            <div className="ml-1 grid flex-1 text-left text-xl">
                <span className={cn('mb-0.5 font-semibold text-lime-500 font-handwriting', classNameText)}>geekenglish</span>
            </div>
        </>
    );
}
