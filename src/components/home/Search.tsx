import * as React from "react";
import { SearchInput } from "@patternfly/react-core";

function Search() {
    const [search, setSearch] = React.useState("");

    const onChange = (event: React.FormEvent<HTMLInputElement>, value: string) => {
        setSearch(value);
    };

    return (
        <div className="search">
            <SearchInput
                className="ps-1"
                placeholder="Search D4 Resources"
                value={search}
                onChange={onChange}
                onClear={() => setSearch("")}
            />
        </div>
    );
}
export default Search;
