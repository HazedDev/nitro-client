export class NitroConfiguration
{
    public static RELEASE_VERSION           = 'PRODUCTION-201611291003-338511768';
    public static SOCKET_URL                = 'ws://127.0.0.1:30010';
    public static ASSET_URL                 = 'https://assets.nitrots.co';

    public static EXTERNAL_TEXTS_URL        = NitroConfiguration.ASSET_URL + '/gamedata/json/ExternalTexts.json';
    public static AVATAR_GEOMETRY_URL       = NitroConfiguration.ASSET_URL + '/gamedata/json/HabboAvatarGeometry.json';
    public static AVATAR_PARTSETS_URL       = NitroConfiguration.ASSET_URL + '/gamedata/json/HabboAvatarPartSets.json';
    public static AVATAR_ACTIONS_URL        = NitroConfiguration.ASSET_URL + '/gamedata/json/HabboAvatarActions.json';
    public static AVATAR_ANIMATIONS_URL     = NitroConfiguration.ASSET_URL + '/gamedata/json/HabboAvatarAnimations.json';
    public static AVATAR_FIGUREDATA_URL     = NitroConfiguration.ASSET_URL + '/gamedata/habbo/figuredata.xml';
    public static AVATAR_FIGUREMAP_URL      = NitroConfiguration.ASSET_URL + '/gamedata/json/FigureMap.json';
    public static AVATAR_EFFECTMAP_URL      = NitroConfiguration.ASSET_URL + '/gamedata/json/EffectMap.json';
    public static AVATAR_ASSET_URL          = NitroConfiguration.ASSET_URL + '/figure/%libname%/%libname%.json';
    public static AVATAR_ASSET_EFFECT_URL   = NitroConfiguration.ASSET_URL + '/effect/%libname%/%libname%.json';
    public static FURNIDATA_URL             = NitroConfiguration.ASSET_URL + '/gamedata/json/FurnitureDataNGH.json';
    public static BADGE_URL                 = NitroConfiguration.ASSET_URL + '/badges/%badgename%.gif';
    public static GROUP_BADGE_URL           = NitroConfiguration.ASSET_URL + '/group-badge/%badgedata%';
    public static PET_ASSET_URL             = NitroConfiguration.ASSET_URL + '/pet/%libname%/%libname%.json';
    public static FURNI_ASSET_URL           = NitroConfiguration.ASSET_URL + '/furniture/%libname%/%libname%.json';
    public static FURNI_ASSET_ICON_URL      = 'https://swf.nextgenhabbo.com/dcr/hof_furni/icons/%libname%%param%_icon.png';
    public static ROOM_ASSET_URL            = NitroConfiguration.ASSET_URL + '/room/%libname%/%libname%.json';

    public static FPS                       = 24;
    public static PACKET_LOG                = false;
    public static EVENT_DISPATCHER_LOG      = false;
    public static ROLLING_OVERRIDES_POSTURE = true;
    public static CLIENT_KEEPS_ALIVE        = true;
    public static PONG_INTERVAL_MS          = 30000;
    public static FIGURE_HIGHLIGHT_ENABLED  = false;

    public static PET_TYPES                 = [ 'dog', 'cat', 'croco', 'terrier', 'bear', 'pig', 'lion', 'rhino', 'spider', 'turtle', 'chicken', 'frog', 'dragon', 'monster', 'monkey', 'horse', 'monsterplant', 'bunnyeaster', 'bunnyevil', 'bunnydepressed', 'bunnylove', 'pigeongood', 'pigeonevil', 'demonmonkey', 'bearbaby', 'terrierbaby', 'gnome', 'gnome', 'kittenbaby', 'puppybaby', 'pigletbaby', 'haloompa', 'fools', 'pterosaur', 'velociraptor', 'cow', 'LeetPen', 'bbwibb', 'elephants' ];

    public static MANDATORY_AVATAR_LIBRARIES    = ['bd:1', 'li:0'];
    public static MANDATORY_EFFECT_LIBRARIES    = ['dance.1', 'dance.2', 'dance.3', 'dance.4'];

    public static PRELOAD_ASSETS: string[]  = [
        NitroConfiguration.ASSET_URL + `/images/additions/user_blowkiss.png`,
        NitroConfiguration.ASSET_URL + `/images/additions/user_idle_left_1.png`,
        NitroConfiguration.ASSET_URL + `/images/additions/user_idle_left_2.png`,
        NitroConfiguration.ASSET_URL + `/images/additions/user_idle_right_1.png`,
        NitroConfiguration.ASSET_URL + `/images/additions/user_idle_right_2.png`,
        NitroConfiguration.ASSET_URL + `/images/additions/user_typing.png`,
        NitroConfiguration.ASSET_URL + `/images/loading_icon.png`,
    ];

    public static AVATAR_DEFAULT_ACTIONS = {
        "actions": [
            {
                "id": "Default",
                "state": "std",
                "precedence": 1000,
                "main": true,
                "isDefault": true,
                "geometryType": "vertical",
                "activePartSet": "figure",
                "assetPartDefinition": "std"
            }
        ]
    };

    public static AVATAR_DEFAULT_FIGUREDATA = `<?xml version="1.0" encoding="UTF-8"?>
    <figuredata>
        <colors>
            <palette id="1">
                <color id="99999" index="1001" club="0" selectable="0">DDDDDD</color>
                <color id="99998" index="1001" club="0" selectable="0">FAFAFA</color>
            </palette>
            <palette id="3">
                <color id="10001" index="1001" club="0" selectable="0">EEEEEE</color>
                <color id="10002" index="1002" club="0" selectable="0">FA3831</color>
                <color id="10003" index="1003" club="0" selectable="0">FD92A0</color>
                <color id="10004" index="1004" club="0" selectable="0">2AC7D2</color>
                <color id="10005" index="1005" club="0" selectable="0">35332C</color>
                <color id="10006" index="1006" club="0" selectable="0">EFFF92</color>
                <color id="10007" index="1007" club="0" selectable="0">C6FF98</color>
                <color id="10008" index="1008" club="0" selectable="0">FF925A</color>
                <color id="10009" index="1009" club="0" selectable="0">9D597E</color>
                <color id="10010" index="1010" club="0" selectable="0">B6F3FF</color>
                <color id="10011" index="1011" club="0" selectable="0">6DFF33</color>
                <color id="10012" index="1012" club="0" selectable="0">3378C9</color>
                <color id="10013" index="1013" club="0" selectable="0">FFB631</color>
                <color id="10014" index="1014" club="0" selectable="0">DFA1E9</color>
                <color id="10015" index="1015" club="0" selectable="0">F9FB32</color>
                <color id="10016" index="1016" club="0" selectable="0">CAAF8F</color>
                <color id="10017" index="1017" club="0" selectable="0">C5C6C5</color>
                <color id="10018" index="1018" club="0" selectable="0">47623D</color>
                <color id="10019" index="1019" club="0" selectable="0">8A8361</color>
                <color id="10020" index="1020" club="0" selectable="0">FF8C33</color>
                <color id="10021" index="1021" club="0" selectable="0">54C627</color>
                <color id="10022" index="1022" club="0" selectable="0">1E6C99</color>
                <color id="10023" index="1023" club="0" selectable="0">984F88</color>
                <color id="10024" index="1024" club="0" selectable="0">77C8FF</color>
                <color id="10025" index="1025" club="0" selectable="0">FFC08E</color>
                <color id="10026" index="1026" club="0" selectable="0">3C4B87</color>
                <color id="10027" index="1027" club="0" selectable="0">7C2C47</color>
                <color id="10028" index="1028" club="0" selectable="0">D7FFE3</color>
                <color id="10029" index="1029" club="0" selectable="0">8F3F1C</color>
                <color id="10030" index="1030" club="0" selectable="0">FF6393</color>
                <color id="10031" index="1031" club="0" selectable="0">1F9B79</color>
                <color id="10032" index="1032" club="0" selectable="0">FDFF33</color>
            </palette>
        </colors>
        <sets>
            <settype type="hd" paletteid="1" mand_m_0="1" mand_f_0="1" mand_m_1="1" mand_f_1="1">
                <set id="99999" gender="U" club="0" colorable="1" selectable="0">
                <part id="1" type="bd" colorable="1" index="0" colorindex="1" />
                <part id="1" type="hd" colorable="1" index="0" colorindex="1" />
                <part id="1" type="lh" colorable="1" index="0" colorindex="1" />
                <part id="1" type="rh" colorable="1" index="0" colorindex="1" />
                </set>
            </settype>
            <settype type="bds" paletteid="1" mand_m_0="0" mand_f_0="0" mand_m_1="0" mand_f_1="0">
                <set id="10001" gender="U" club="0" colorable="1" selectable="0">
                    <part id="10001" type="bds" colorable="1" index="0" colorindex="1"/>
                    <part id="10001" type="lhs" colorable="1" index="0" colorindex="1"/>
                    <part id="10001" type="rhs" colorable="1" index="0" colorindex="1"/>
                    <hiddenlayers>
                        <layer parttype="bd"/>
                        <layer parttype="rh"/>
                        <layer parttype="lh"/>
                    </hiddenlayers>
                </set>
            </settype>
            <settype type="ss" paletteid="3" mand_m_0="0" mand_f_0="0" mand_m_1="0" mand_f_1="0">
                <set id="10010" gender="F" club="0" colorable="1" selectable="0">
                    <part id="10001" type="ss" colorable="1" index="0" colorindex="1"/>
                    <hiddenlayers>
                        <layer parttype="ch"/>
                        <layer parttype="lg"/>
                        <layer parttype="ca"/>
                        <layer parttype="wa"/>
                        <layer parttype="sh"/>
                        <layer parttype="ls"/>
                        <layer parttype="rs"/>
                        <layer parttype="lc"/>
                        <layer parttype="rc"/>
                        <layer parttype="cc"/>
                        <layer parttype="cp"/>
                    </hiddenlayers>
                </set>
                <set id="10011" gender="M" club="0" colorable="1" selectable="0">
                    <part id="10002" type="ss" colorable="1" index="0" colorindex="1"/>
                    <hiddenlayers>
                        <layer parttype="ch"/>
                        <layer parttype="lg"/>
                        <layer parttype="ca"/>
                        <layer parttype="wa"/>
                        <layer parttype="sh"/>
                        <layer parttype="ls"/>
                        <layer parttype="rs"/>
                        <layer parttype="lc"/>
                        <layer parttype="rc"/>
                        <layer parttype="cc"/>
                        <layer parttype="cp"/>
                    </hiddenlayers>
                </set>
            </settype>
        </sets>
    </figuredata>`;
}