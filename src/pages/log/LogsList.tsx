import {useForm} from "react-hook-form";
import {Box} from "@mui/material";
import PageHeader from "../../components/text/PageHeader.tsx";
import AddButton from "../../components/button/AddButton.tsx";
import ContentCard from "../../components/layout/ContentCard.tsx";
import ProjectTable from "../projects/ProjectTable.tsx";
import LogsFilter from "./LogsFilter.tsx";

const LogsList = () => {
    const { control, reset, handleSubmit, setValue } = useForm({
        defaultValues: {
            taskIdIn: [],
            onlyActives: false,
        },
    });

    const onSubmit = handleSubmit((data) => {});

    const onReset = () => {
        reset();
        onSubmit();
    };

    return (
        <Box>
            <PageHeader text={'History'}/>

            <Box sx={{ display: 'flex'}}>
                <LogsFilter />
            </Box>

            <ContentCard>
                <Box sx={{ display: 'flex', marginTop: 5, marginBottom: 10}}>
                    <ProjectTable />
                </Box>
            </ContentCard>
        </Box>
    );
};


export default LogsList;