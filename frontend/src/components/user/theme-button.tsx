
import { Sun, Moon } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface ThemeButtonProps {
    children?: React.ReactNode;
}

const ThemeButton = ({ children }: ThemeButtonProps) => {
    return ( 
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Sun size={20} />    
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem>
              <Sun className="w-4 h-4 mr-2" />
              Light
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Moon className="w-4 h-4 mr-2" />
              Dark
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu> );
}
 
export default ThemeButton;