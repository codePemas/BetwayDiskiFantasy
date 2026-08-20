using BetwayDiskiFantasy.Api.Models;

namespace BetwayDiskiFantasy.Api.Services
{
    public static class ScoringEngine
    {
        public static int CalculatePoints(PlayerPerformance stats, string position)
        {
            int points = 0;
            string pos = position.ToUpper();

            // 1. Appearance Points
            if (stats.MinutesPlayed > 0 && stats.MinutesPlayed < 60)
            {
                points += 1;
            }
            else if (stats.MinutesPlayed >= 60)
            {
                points += 2;
            }

            // 2. Goals Scored
            if (pos == "GK" || pos == "DEF") points += stats.GoalsScored * 6;
            else if (pos == "MID") points += stats.GoalsScored * 5;
            else if (pos == "FWD") points += stats.GoalsScored * 4;

            // 3. Assists
            points += stats.Assists * 3;

            // 4. Clean Sheets (Requires >= 60 mins played)
            if (stats.MinutesPlayed >= 60 && stats.CleanSheet > 0)
            {
                if (pos == "GK" || pos == "DEF") points += 4;
                else if (pos == "MID") points += 1;
            }

            // 5. Goals Conceded (GKs and DEFs lose 1 pt per 2 goals conceded)
            if ((pos == "GK" || pos == "DEF") && stats.GoalsConceded >= 2)
            {
                points -= (stats.GoalsConceded / 2);
            }

            // 6. Penalty Saves & Misses
            if (pos == "GK") points += stats.PenaltySaves * 5;
            points -= stats.PenaltyMisses * 2;

            // 7. Disciplinaries & Penalties
            points -= stats.YellowCards * 1;
            points -= stats.RedCards * 3;
            points -= stats.OwnGoals * 2;

            // 8. Bonus Points
            points += stats.BonusPoints;

            return points;
        }
    }
}