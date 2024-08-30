import { Arrangement } from "@/schemas/arrangement";
import { lavTerskelArrangement } from "@/schemas/lavterskelArrangement";
import { useCurrentUser } from "@/hooks/use-current-user";

interface EventCalendarViewProps {
  combinedArrangements: (Arrangement | lavTerskelArrangement)[];
  openForm: Boolean;
  onDeletionSuccess?: (success: boolean) => void;
}

const EventCalendarView: React.FC<EventCalendarViewProps> = ({
  combinedArrangements,
  openForm,
  onDeletionSuccess,
}) => {
  const checkOwnsLTA = (arrangementCreator: string, userId: string) => {
    return arrangementCreator === userId;
  };

  const handleDelete = async (id: string): Promise<number | void> => {
    try {
      const response = await fetch("/api/arrangementer", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        console.log("Successfully deleted lavterskelarrangement");
        if (onDeletionSuccess) {
          onDeletionSuccess(true);
        }
      } else {
        console.error("Error deleting lavterskelarrangement", response.statusText);
        if (onDeletionSuccess) {
          onDeletionSuccess(false);
        }
      }
    } catch (error) {
      console.error("Internal server error:", error);
    }
  };

  const user = useCurrentUser();

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
          if ("id" in arrangement) {
            return (
              <div
                key={arrangement.id}
                className="py-2 flex justify-start items-center gap-x-2"
              >
                <div
                  className={`w-2 h-2 ${arrangementColor} rounded-full`}
                ></div>

                {arrangementColor === "bg-yellow-500" ? (
                  <div className="w-full flex justify-between items-center">
                    <a
                      href={`arrangement/${arrangement.id}`}
                      className="text-underscore flex flex-col w-[80%]"
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
                      <p className="font-normal text-base">
                        {arrangement.sted}
                      </p>
                    </a>
                  </div>
                ) : (
                  <div className="w-full flex justify-between items-center ">
                    <div className="flex flex-col w-[80%]">
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
                    {/* Check if the current user owns the arrangement */}
                    {"userId" in arrangement && user?.id && checkOwnsLTA(arrangement.userId as string, user.id) && (
                      <button
                        onClick={() => handleDelete(arrangement.id)}
                        className="font-normal py-1 px-3 rounded-md mt-2 text-underscore"
                      >
                        Slett?
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          }
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
