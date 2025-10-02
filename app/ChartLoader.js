// Alr so charting time now, YIKES!

/*

Data required:

                                                                        **TEAM**

[INPUT] Event, Team

- EPA
    - SAD
        - Go through every entry for team
        - Find point values for all game pieces for each entry,
        - Average it
    - TORS
        - Send a request (SB -> Single TeamEvent)

- Data Accuracy
    - Unscouted Matches
        - Check team's matches from Match Schedule
        - Check entries for team in matches
        - Check max match # of entries
        - See # of matches team had before or during max match
        - Compare to the # of entries
        - Return the matches scouted, and the ones unscouted

- Tele Game Pieces Scored Over Comp
    - Line graph (multiline)
        - For every entry, see how much of each scoring method is done
        - Display

- Auto Game Pieces Scored Over Comp
    - Line graph (multiline)
        - For every entry, see how much of each scoring method is done
        - Display

- Climb to No Climb Ratio
    - Bar100
        - All entries
        - Get the percentage of shallow, deep, park, none
        - Display


                                                                        **MATCH**



- Game Piece Specification (this one is insane)
    - For Every Match
        - Radar Chart
            - SAD
                - The match's entry and all the data from that
            - TORS
                - Check EPA breakdown for the match (SB -> Single TeamMatch)
            - Overlay the data from SAD and TORS to see difference
        
    - For Comp
        - Radar Chart
            - SAD
                - Averages for all entries for team
            - TORS
                - Check EPA breakdown for the comp (SB -> Single TeamEvent)

- Game Piece Miss Ratios (just our data)
    - For Every Match
        - Bar 100 Chart
            - Each match's entry and the miss and made data

    - For Comp
        - Bar 100 Chart
            - Average of miss and made data for the team


                                                                        **COMP**


- Table of Schedule
    - Yellow background if unscouted
    - Clicking on Team Number from Match redirects to Match

    - Use Team Schedule from SAD
    - Check through each match to see if there are entries


*/