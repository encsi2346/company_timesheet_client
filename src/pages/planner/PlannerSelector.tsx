import ContentCard from "../../components/layout/ContentCard.tsx";
import MyPlannerCard from "../../components/layout/MyPlannerCard.tsx";
import EmployeesPlannerCard from "../../components/layout/EmployeesPlannerCard.tsx";
import {Box} from "@mui/material";
import { Link } from 'react-router-dom';

const PlannerSelector = () => {

    return (
        <ContentCard>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 7, marginTop: 10}}>
                <Link style={{textDecoration: 'none'}} key={'my-planner'} to={'/my-planner'}>
                    <MyPlannerCard text="My Planner"/>
                </Link>
                <Link style={{textDecoration: 'none'}} key={'employees-planner'} to={'/employees-planner'}>
                    <EmployeesPlannerCard text="My Employees Planner"/>
                </Link>
            </Box>
        </ContentCard>
    );
};

export default PlannerSelector;