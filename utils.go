package botCraft

import "github.com/karloid/botCraft/pb"

type GamePoint2D struct {
	X int32
	Y int32
}

func (d GamePoint2D) toPb() *pb.Point2D {
	return &pb.Point2D{
		X: d.X,
		Y: d.Y,
	}
}

func (d GamePoint2D) distanceTo(target *pb.Point2D) int32 {
	return abs(d.X-target.X) + abs(d.Y-target.Y)
}

func (d GamePoint2D) equals(target *pb.Point2D) bool {
	return d.X == target.X && d.Y == target.Y
}

func (d GamePoint2D) distanceManh(d2 GamePoint2D) int32 {
	return abs(d.X-d2.X) + abs(d.Y-d2.Y)
}
