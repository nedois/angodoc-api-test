import {
    User as UserIcon,
    PieChart as PieChartIcon,
    Users as UsersIcon,
    FileText as DocumentsIcon,
    Pocket as FindersIcon
} from "react-feather";
import AgenciesIcon from "@material-ui/icons/BusinessRounded";

import * as LINKS from "@dashboard/routes/uris";

const sections = [
    {
        subheader: "Geral",
        items: [
            {
                title: "Visão geral",
                icon: PieChartIcon,
                href: LINKS.APP.OVERVIEW_URI
            },
            {
                title: "Meu perfil",
                icon: UserIcon,
                href: LINKS.PROFILE.URI
            }
        ]
    },
    {
        subheader: "Recursos",
        items: [
            {
                title: "Documentos",
                icon: DocumentsIcon,
                href: LINKS.DOCUMENTS.URI,
                items: [
                    {
                        onlyFor: ["operador", "diretor"],
                        title: "Documentos na agência",
                        href: LINKS.DOCUMENTS.URI
                    },
                    {
                        onlyFor: ["administrador"],
                        title: "Todos documentos",
                        href: LINKS.DOCUMENTS.URI
                    },
                    {
                        onlyFor: ["operador", "diretor"],
                        title: "Registar documento",
                        href: LINKS.DOCUMENTS.CREATE_URI
                    }
                ]
            },
            {
                title: "Encontradores",
                icon: FindersIcon,
                href: LINKS.FINDERS.URI
            },
            {
                title: "Agências",
                icon: AgenciesIcon,
                href: LINKS.AGENCIES.URI,
                items: [
                    {
                        onlyFor: ["administrador"],
                        title: "Todas agências",
                        href: LINKS.AGENCIES.URI
                    },
                    {
                        onlyFor: ["operador", "diretor"],
                        title: "Minha agência",
                        href: `${LINKS.AGENCIES.URI}/minha-agencia`
                    },
                    {
                        onlyFor: ["administrador"],
                        title: "Nova agência",
                        href: LINKS.AGENCIES.CREATE_URI
                    }
                ]
            }
        ]
    },
    {
        subheader: "Gestão do sistema",
        items: [
            {
                title: "Funcionários",
                href: LINKS.USERS.URI,
                icon: UsersIcon,
                items: [
                    {
                        onlyFor: ["administrador"],
                        title: "Todos funcionários",
                        href: LINKS.USERS.ALL_URI
                    },
                    {
                        onlyFor: ["operador", "diretor"],
                        title: "Funcionários da agência",
                        href: LINKS.USERS.URI
                    },
                    {
                        onlyFor: ["diretor"],
                        title: "Novo funcionário",
                        href: LINKS.USERS.CREATE_URI
                    }
                ]
            }
        ]
    }
];

export default sections;
