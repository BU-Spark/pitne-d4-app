import * as React from "react";
import { SearchInput } from "@patternfly/react-core";

function Search() {
    const [search, setSearch] = React.useState("");

    const onChange = (value: string) => {
        setSearch(value);
    };
    
    return (
        <div className="search">
            <SearchInput
                className="ps-1"
                placeholder="Search D7 Resources"
                value={search}
                onChange={onChange}
                onClear={() => onChange("")}
            />
        </div>
    );
}
export default Search;