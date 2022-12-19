import axios from "axios";
const localhost = '192.168.43.217:5000'

export async function login(data) {
    try {
        const response = await axios({
            url: `http://${localhost}/api/v1/app/accounts/login`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
            },
            data: data
        });
        if (response.status !== 200) {
            throw new Error("axios faild");
        }
        console.log("addProject: ", response.data)
        return response.data;
    } catch (e) {
        console.log(e);
        return { error: e.message };
    }
}

export async function getAccount(username, owner) {
    try {
        const response = await axios({
            url: `http://${localhost}/api/v1/app/accounts?username=${username}&owner=${owner}`,
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status !== 200) {
            throw new Error("axios faild");
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return { error: e.message };
    }
}

export async function addProject(data) {
    try {
        const response = await axios({
            url: `http://${localhost}/api/v1/app/projects`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
            },
            data: data
        });
        if (response.status !== 200) {
            throw new Error("axios faild");
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return { error: e.message };
    }
}

export async function getProjectInfo(username) {
    try {
        const response = await axios({
            url: `http://${localhost}/api/v1/app/projects?member=${username}`,
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status !== 200) {
            throw new Error("axios faild");
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return { error: e.message };
    }
}

export async function searchProjectInfo(projectName, owner) {
    try {
        const response = await axios({
            url: `http://${localhost}/api/v1/app/projects?projectName=${projectName}&owner=${owner}`,
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status !== 200) {
            throw new Error("axios faild");
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return { error: e.message };
    }
}

export async function getAllListName(projectID) {
    try {
        const response = await axios({
            url: `http://${localhost}/api/v1/app/listNames?projectID=${projectID}`,
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status !== 200) {
            throw new Error("axios faild");
        }
        console.log("getListName: ", response.data)
        return response.data;
    } catch (e) {
        console.log(e);
        return { error: e.message };
    }
}

export async function addTask(data) {
    try {
        const response = await axios({
            url: `http://${localhost}/api/v1/app/tasks`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
            },
            data: data
        });
        if (response.status !== 200) {
            throw new Error("axios faild");
        }
        console.log("addTask: ", response.data)
        return response.data;
    } catch (e) {
        console.log(e);
        return { error: e.message };
    }
}

export async function addMemberstoProject(projectId, username) {
    try {
        const response = await axios({
            url: `http://${localhost}/api/v1/app/projects/addMember`,
            method: 'PUT',
            header: {
                'Content-Type': 'application/json',
            },
            data: {
                projectId: projectId,
                username: username
            }
        });
        if (response.status !== 200) {
            throw new Error("axios faild");
        }
        console.log("addMemberstoProject: ", response.data)
        return response.data;
    } catch (e) {
        console.log(e);
        return { error: e.message };
    }
}

export async function getMemberstoProject(projectId) {
    try {
        const response = await axios({
            url: `http://${localhost}/api/v1/app/projects/getMember?projectID=${projectId}`,
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status !== 200) {
            throw new Error("axios faild");
        }
        console.log("getMemberstoProject: ", response.data)
        return response.data;
    } catch (e) {
        console.log(e);
        return { error: e.message };
    }
}

export async function addList(projectID, listName) {
    try {
        const response = await axios({
            url: `http://${localhost}/api/v1/app/listNames`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
            },
            data: {
                projectID: projectID,
                listName: listName
            }
        });
        if (response.status !== 200) {
            throw new Error("axios faild");
        }
        console.log("addList: ", response.data)
        return response.data;
    } catch (e) {
        console.log(e);
        return { error: e.message };
    }
}

export async function updateTask(data) {
    try {
        console.log("updateTask API: ", data)
        const response = await axios({
            url: `http://${localhost}/api/v1/app/tasks`,
            method: 'PUT',
            header: {
                'Content-Type': 'application/json',
            },
            data: data
        });
        if (response.status !== 200) {
            throw new Error("axios faild");
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return { error: e.message };
    }
}

export async function getActivities(taskId) {
    try {
        const response = await axios({
            url: `http://${localhost}/api/v1/app/activity/?taskId=${taskId}`,
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status !== 200) {
            throw new Error("axios faild");
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return { error: e.message };
    }
}

export async function saveActivity(data) {
    try {
        const response = await axios({
            url: `http://${localhost}/api/v1/app/activity`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
            },
            data: data
        });
        if (response.status !== 200) {
            throw new Error("axios faild");
        }
        console.log("saveActivity: ", response.data)
        return response.data;
    } catch (e) {
        console.log(e);
        return { error: e.message };
    }
}

export async function updateAccount(data) {
    try {
        const response = await axios({
            url: `http://${localhost}/api/v1/app/accounts`,
            method: 'PUT',
            header: {
                'Content-Type': 'application/json',
            },
            data: data
        });
        if (response.status !== 200) {
            throw new Error("axios faild");
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return { error: e.message };
    }
}

export async function getStatusRate(projectId) {
    try {
        const response = await axios({
            url: `http://${localhost}/api/v1/app/statistical/status-rate?projectId=${projectId}`,
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
            },
        })

        if (response.status !== 200) {
            throw new Error("axios faild");
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return { error: e.message }
    }
}

export async function statisticalMember(projectId) {
    try {
        const response = await axios({
            url: `http://${localhost}/api/v1/app/statistical/members?projectId=${projectId}`,
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
            },
        })

        if (response.status !== 200) {
            throw new Error("axios faild");
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return { error: e.message }
    }
}

export async function statisticalTask(projectId) {
    try {
        const response = await axios({
            url: `http://${localhost}/api/v1/app/statistical/tasks?projectId=${projectId}`,
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
            },
        })

        if (response.status !== 200) {
            throw new Error("axios faild");
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return { error: e.message }
    }
}