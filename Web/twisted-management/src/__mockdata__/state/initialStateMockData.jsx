import assistantsMockData from "./assistantsMockData";
import { navigationDetail } from "./navigationDetail";

const initialStateMockData = {
    pageSize:10,
    navigationDetail: { ...navigationDetail },
    assistants: [...assistantsMockData.assistants]
}

export default initialStateMockData;