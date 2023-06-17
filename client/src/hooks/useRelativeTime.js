// 상대시간 출력을 위한 custom hook
import { useEffect, useState } from "react";
import moment from "moment";

function useRelativeTime(time) {
  const serverTime = moment(time); // 서버에서 받은 시간
  const [relativeTime, setRelativeTime] = useState("");

  useEffect(() => {
    const currentTime = moment();
    const diff = currentTime.diff(serverTime);
    const duration = moment.duration(diff);

    if (duration.asSeconds() < 60) {
      setRelativeTime(`${Math.round(duration.asSeconds())}초 전`);
    } else if (duration.asMinutes() < 60) {
      setRelativeTime(`${Math.round(duration.asMinutes())}분 전`);
    } else if (duration.asHours() < 24) {
      setRelativeTime(`${Math.round(duration.asHours())}시간 전`);
    } else {
      setRelativeTime(`${Math.round(duration.asDays())}일 전`);
    }
  }, [serverTime]);

  return relativeTime;
}

export default useRelativeTime;
