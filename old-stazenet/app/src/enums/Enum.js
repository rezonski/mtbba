const Enum = {
    MapEvents: {
        RETRIEVE_MAP_INIT: '__RETRIEVE_MAP_INIT__',
        RETRIEVE_INITIAL_DATA_SETUP: '__RETRIEVE_INITIAL_DATA_SETUP__',
        INITIAL_MAP_SETUP_RETRIEVED: '__INITIAL_MAP_SETUP_RETRIEVED__',
        MAP_STYLES_RETRIEVED: '__MAP_STYLES_RETRIEVED__',
        CHANGE_MAP_STYLE: '__CHANGE_MAP_STYLE__',
        INITIAL_DATA_SETUP_RETRIEVED: '__INITIAL_DATA_SETUP_RETRIEVED__',
        REQUEST_DISPLAY_PATH_LAYERS: '__REQUEST_DISPLAY_PATH_LAYERS__',
        DISPLAY_PATH_LAYERS_ON_MAP: '__DISPLAY_PATH_LAYERS_ON_MAP__',
        REBUILD_PATH_LAYERS: '__REBUILD_PATH_LAYERS__',
        SAVE_LEFT_MAP: '__SAVE_LEFT_MAP__',
        SAVE_RIGHT_MAP: '__SAVE_RIGHT_MAP__',
        SAVE_PREVIEW_MAP: '__SAVE_PREVIEW_MAP__',
        SHOW_PREVIEW_MAP: '__SHOW_PREVIEW_MAP__',
        HIDE_PREVIEW_MAP: '__HIDE_PREVIEW_MAP__',
        MAP_RESET_2_NORTH: '__MAP_RESET_2_NORTH__',
        PRELOAD_MAP_ICONS: '__PRELOAD_MAP_ICONS__',
        CONTROL_WP_POPUP: '__CONTROL_WP_POPUP__',
        FOCUS_FEATURE_ON_MAP: '__FOCUS_FEATURE_ON_MAP__',
    },
    AppEvents: {
        OPEN_FORM_NEW_TRAIL: '__OPEN_FORM_NEW_TRAIL__',
        CLOSE_FORM_NEW_TRAIL: '__CLOSE_FORM_NEW_TRAIL__',
        OPEN_FORM_OPEN_TRAIL: '__OPEN_FORM_OPEN_TRAIL__',
        OPEN_FORM_EDIT_WAYPOINTS: '__OPEN_FORM_EDIT_WAYPOINTS__',
        CHANGE_LANGUAGE: '__CHANGE_LANGUAGE__',
        TOGGLE_WP_DRAWER: '__TOGGLE_WP_DRAWER__',
        PREVIEW_PICTOGRAM: '__PREVIEW_PICTOGRAM__',
        ENABLE_WP_DRAWER: '__ENABLE_WP_DRAWER__',
        ENABLE_TRAIL_SAVE: '__ENABLE_TRAIL_SAVE__',
    },
    DataEvents: {
        SAVE_TRAILDATA2MODEL: '__SAVE_TRAILDATA2MODEL__',
        UPDATE_TRAILDATA2MODEL: '__UPDATE_TRAILDATA2MODEL__',
        RETRIEVE_TRAIL_DATA: '__RETRIEVE_TRAIL_DATA__',
        RETRIEVE_CHART_DATA: '__RETRIEVE_CHART_DATA__',
        RETRIEVE_TRAILS_LIST: '__RETRIEVE_TRAILS_LIST__',
        TRAIL_DATA_RETRIEVED: '__TRAIL_DATA_RETRIEVED__',
        CHART_DATA_RETRIEVED: '__CHART_DATA_RETRIEVED__',
        TRAILS_LIST_RETRIEVED: '__TRAILS_LIST_RETRIEVED__',
        DOWNLOAD_TRAIL: '__DOWNLOAD_TRAIL__',
        UPLOAD_TRAIL: '__UPLOAD_TRAIL__',
        PUBLISH_TRAIL: '__PUBLISH_TRAIL__',
        TRAIL_DOWNLOADED: '__TRAIL_DOWNLOADED__',
        START_IMAGE_UPLOAD: '__START_IMAGE_UPLOAD__',
        SAVE_INITIAL_GEO_FILE: '__SAVE_INITIAL_GEO_FILE__',
        SAVE_MANUAL_EDITED_FILE: '__SAVE_MANUAL_EDITED_FILE__',
        START_SIMPLIFYING_PATH: '__START_SIMPLIFYING_PATH__',
        START_ELEVATING_PATH: '__START_ELEVATING_PATH__',
        START_FLATTENING_PATH: '__START_FLATTENING_PATH__',
        START_FIXING_WAYPOINTS: '__START_FIXING_WAYPOINTS__',
        TRANSLATE_BY_OFFSET: '__TRANSLATE_BY_OFFSET__',
        SAVE2FILE_JSON: '__SAVE2FILE_JSON__',
        ADD_NEW_WAYPOINT: '__ADD_NEW_WAYPOINT__',
        NEW_WAYPOINT_DATA: '__NEW_WAYPOINT_DATA__',
        ADD_SURFACE_CHANGE: '__ADD_SURFACE_CHANGE__',
        GENERATE_WP_SUGGESTIONS: '__GENERATE_WP_SUGGESTIONS__',
        WP_SUGGESTIONS_GENERATED: '__WP_SUGGESTIONS_GENERATED__',
    },
    ChartEvents: {
        CHART_POINT_CLICKED: '__CHART_POINT_CLICKED__',
        CHART_POINT_HOVERED: '__CHART_POINT_HOVERED__',
    },
};

export default Enum;
