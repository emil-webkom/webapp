import { Arrangement } from "@/schemas/arrangement";
import { lavTerskelArrangement } from "@/schemas/lavterskelArrangement";

interface EventCalendarViewProps {
  combinedArrangements: (Arrangement | lavTerskelArrangement)[];
  openForm: Boolean;
}

const EventCalendarView: React.FC<EventCalendarViewProps> = ({
  combinedArrangements,
  openForm,
}) => {
  if (combinedArrangements.length > 0 && !openForm) {
    return (
      <>
        {combinedArrangements.map((arrangement) => {
          let arrangementColor = "bg-yellow-500";

          if ("type" in arrangement) {
            if (arrangement.type === "Internt arrangement") {
              arrangementColor = "bg-blue-500";
            } else if (arrangement.type === "Eksternt arrangement") {
              arrangementColor = "bg-red-500";
            }
          }
          if ("id" in arrangement){
          return (
            <div
              key={arrangement.id}
              className="py-2 flex justify-start items-center gap-x-2"
            >
              <div className={`w-2 h-2 ${arrangementColor} rounded-full`}></div>

              {arrangementColor === "bg-yellow-500" ? (
                <div>
                  <a
                    href={`arrangement/${arrangement.id}`}
                    className="text-underscore"
                  >
                    <h2 className="font-bold text-base lg:text-lg">
                      {arrangement.navn}
                      <span className="font-normal">
                        {" "}
                        -{" "}
                        {new Date(arrangement.dato).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </h2>
                    <p className="font-normal text-base">{arrangement.sted}</p>
                  </a>
                </div>
              ) : (
                <div>
                  <h2 className="font-bold text-base lg:text-lg">
                    {arrangement.navn}
                    <span className="font-normal">
                      {" "}
                      -{" "}
                      {new Date(arrangement.dato).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </h2>
                  <p className="font-normal text-base">{arrangement.sted}</p>
                </div>
              )}
            </div>
          )};
        })}
      </>
    );
  } else if (combinedArrangements.length > 0 && openForm) {
    return <p className="text-gray-600 text-base">Skjuler arrangementer</p>;
  } else {
    return <p className="text-gray-600 text-base">Ingen arrangementer</p>;
  }
};

export default EventCalendarView;
