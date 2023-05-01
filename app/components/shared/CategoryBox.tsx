'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from 'query-string';

interface CategoryBoxProps {
    icon: IconType;
    label: string;
    selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
    label,
    icon: Icon,
    selected
}) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        let currentQuery = {};

        if (params) {
            //parsing the params as an object so to avoid the default string behaviour
            currentQuery = qs.parse(params.toString());
        }

        //adding to the query the category via label from the parent component.
        const updatedQuery: any = {
            ...currentQuery, category: label
        }

        // what if its already selected? then remove it from the updatedquery
        if(params?.get('category') === label) {
            delete updatedQuery.category;
        }

        //stringify it back
        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {skipNull: true});

        router.push(url);
    },[label, params, router])

  return (
    <div className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${selected ? 'border-b-neutral-800' : 'border-transparent'} ${selected ? 'text-neutral-800' : 'text-neutral-500'}`} onClick={handleClick}>
        <Icon size={26} />
        <div className="font-medium text-sm">
            {label}
        </div>
    </div>
  )
}
export default CategoryBox;