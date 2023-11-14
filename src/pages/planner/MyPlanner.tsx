import {useForm} from "react-hook-form";
import {Box} from "@mui/material";
import ContentCard from "../../components/layout/ContentCard.tsx";
import ProjectTable from "../projects/ProjectTable.tsx";
import MyPlannerFilter from "./MyPlannerFilter.tsx";

const MyPlanner = () => {
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
            <Box sx={{ display: 'flex'}}>
                <MyPlannerFilter />
            </Box>

            <ContentCard>
                <Box sx={{ display: 'flex', marginTop: 5, marginBottom: 10}}>
                    <ProjectTable />
                </Box>
            </ContentCard>
        </Box>
    );
};


export default MyPlanner;