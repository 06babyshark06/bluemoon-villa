import {
    IconButton,
    SpeedDial,
    SpeedDialHandler,
    SpeedDialContent,
    SpeedDialAction,
    Typography,
  } from "@material-tailwind/react";
  import {
    PlusIcon,
    HomeIcon,
    CogIcon,
    Square3Stack3DIcon,
  } from "@heroicons/react/24/outline";
   
  export default function SpeedDialWithTextInside() {
    return (
        <div className="fixed bottom-16 right-16">
          <SpeedDial>
            <SpeedDialHandler>
              <IconButton size="lg" className="rounded-full">
                <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
              </IconButton>
            </SpeedDialHandler>
            <SpeedDialContent>
              <SpeedDialAction className="h-16 w-16">
                <HomeIcon className="h-5 w-5" />
                <Typography color="blue-gray" className="text-xs font-normal">
                  Home
                </Typography>
              </SpeedDialAction>
              <SpeedDialAction className="h-16 w-16">
                <CogIcon className="h-5 w-5" />
                <Typography color="blue-gray" className="text-xs font-normal">
                  Settings
                </Typography>
              </SpeedDialAction>
              <SpeedDialAction className="h-16 w-16">
                <Square3Stack3DIcon className="h-5 w-5" />
                <Typography color="blue-gray" className="text-xs font-normal">
                  Pages
                </Typography>
              </SpeedDialAction>
            </SpeedDialContent>
          </SpeedDial>
        </div>
    );
  }