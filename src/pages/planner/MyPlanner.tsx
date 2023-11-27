import {useForm} from "react-hook-form";
import {Box, Button} from "@mui/material";
import {SxProps, Theme} from "@mui/material";
import ContentCard from "../../components/layout/ContentCard.tsx";
import {useTypeSafeTranslation} from "../../components/inputFields/hooks/useTypeSafeTranslation.tsx";
import { Scheduler } from "@aldabil/react-scheduler";
import {useEffect, useState} from "react";
import {RemoteQuery} from "@aldabil/react-scheduler/types";
import {CreateTimeEntryCommand, ProjectsClient, TimeEntriesClient} from "../../api-client.ts";
import {useAuthentication} from "../../auth/AuthProvider.tsx";
import {BackendUrl} from "../../App.tsx";

const saveTitleStyle: SxProps<Theme> = {
    fontWeight: 'regular',
    fontSize: '14px',
    color: '#ffffff',
    backgroundColor: '#29005C',
    borderRadius: '13px',
    marginRight: '20px',
    marginTop: '20px',
    marginBottom: '20px',
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '30px',
    paddingRight: '30px',
    textTransform: 'none',
}

const MyPlanner = () => {
    const { t } = useTypeSafeTranslation();
    const [editable, setEditable] = useState(true);

    const closeMonth = () => {
        setEditable(!editable);
    };

    const { setValue } = useForm({
        defaultValues: {
            taskIdIn: [],
            onlyActives: false,
        },
    });
    
    const auth = useAuthentication();
    
    const [projectOptions, setProjectOptions] = useState([]);
    const [projectOptionsLoaded, setProjectOptionsLoaded] = useState(false);
    useEffect(() => {
        if (!projectOptionsLoaded) {
            setProjectOptionsLoaded(true);
            const client = new ProjectsClient(BackendUrl, auth.http);
            client.getMyProjects().then((response) => {
                const projects = response.map((project) => {
                    return {
                        value: project.id,
                        id: project.id,
                        text: project.title,
                    };
                });
                setProjectOptions(projects);
            });
        }
    }, [auth.http]);

    const EVENTS = [];
    
    //TODO: API calls
    const fetchEvents = async (query : RemoteQuery) => {
        console.log(1);
        const client = new TimeEntriesClient(BackendUrl, auth.http);
        console.log(2);
        query.start.setHours(0);
        query.end.setHours(0);
        const result = await client.mine(query.start, query.end);
        console.log(3);
        return result.map((entry) => {
            console.log(entry);
            return {
                event_id: entry.id,
                title: "" + entry.hours + "hrs " + entry.description,
                start: entry.date,
                end: entry.date,
                allDay: true
            }
        });
    };
    
    const onConfirm = async (event, action) => {
        console.log(event)
        console.log(action)
        const client = new TimeEntriesClient(BackendUrl, auth.http);
        
        const entry : CreateTimeEntryCommand = new CreateTimeEntryCommand({
            date: event.start,
            hours: event.end.getHours() - event.start.getHours(),
            description: event.title,
            projectId: event.projectId
        });
        
        const newId = await client.timeEntries(entry); // post request
        console.log(newId);
        return {
            event_id: newId,
            title: "" + entry.hours + "hrs " + entry.description,
            start: entry.date,
            end: entry.date,
            allDay: true
        };
    };

    if (!projectOptionsLoaded || projectOptions.length === 0) {
        return "Loading...";
    }
    
    return (
        <Box>
            <ContentCard>
                <Button sx={saveTitleStyle} onClick={closeMonth} data-testid='close-button'>
                    {t('TEXT.CLOSE_MONTH')}
                </Button>
                <Scheduler
                    height={500}
                    deletable={false}
                    view="month"
                    events={[]}
                    hourFormat={'24'}
                    editable={false}
                    draggable={false}
                    selectedDate={new Date()}
                    data-testid='scheduler'
                    fields={[
                        {
                            name: "projectId",
                            type: "select",
                            // Should provide options with type:"select"
                            options: projectOptions,
                            config: { label: "Project", required: true, errMsg: "Select a project" }
                        }
                        // Ez lenne a helyes, de mivel úgyis kötelező megadni a start és end időpontot ezért nem kell
                        // ,
                        // {
                        //     name: "hoursWorked",
                        //     type: "input",
                        //     config: {
                        //         label: "Hours Worked",
                        //         md: 6,
                        //         min: 0,
                        //         max: 24,
                        //         decimal: true
                        //     }
                        // }
                    ]}
                    getRemoteEvents={fetchEvents}
                    onConfirm={onConfirm}
                    disableViewNavigator={true}
                    month={{
                        weekDays: [0, 1, 2, 3, 4, 5, 6],
                        weekStartOn: 1,
                        startHour: 0,
                        endHour: 24,
                        cellRenderer: ({ height, start, onClick, ...props }) => {
                            // Fake some condition up
                            const hour = start.getHours();
                            const disabled = hour === 14;
                            const restProps = disabled ? {} : props;
                            return (
                                <Button
                                    style={{
                                        height: "100%",
                                        width: 150,
                                        background: disabled ? "#eee" : "transparent",
                                        cursor: disabled ? "not-allowed" : "pointer"
                                    }}
                                    onClick={() => {
                                        if (disabled) {
                                            return alert("Opss");
                                        }
                                        onClick();
                                    }}
                                    disableRipple={disabled}
                                    // disabled={disabled}
                                    {...restProps}
                                />
                            );
                        }
                    }}
                />
            </ContentCard>
        </Box>
    );
};


export default MyPlanner;