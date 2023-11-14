import ContentCard from "../../components/layout/ContentCard.tsx";
import MyPlannerCard from "../../components/layout/MyPlannerCard.tsx";
import EmployeesPlannerCard from "../../components/layout/EmployeesPlannerCard.tsx";
import {Box} from "@mui/material";

const PlannerSelector = () => {
    return (
        <ContentCard>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 7, marginTop: 10}}>
                <MyPlannerCard text="My Planner"/>
                <EmployeesPlannerCard text="My Employees Planner"/>
            </Box>
        </ContentCard>
    );
};

export default PlannerSelector;